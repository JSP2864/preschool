import os
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from ..deps import get_current_admin, get_db
from ..models import GalleryImage, User
from ..schemas import GalleryImageOut

router = APIRouter(prefix="/api/gallery", tags=["gallery"])

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def _to_out(img: GalleryImage) -> GalleryImageOut:
    return GalleryImageOut(
        id=img.id,
        filename=img.filename,
        caption=img.caption,
        uploaded_at=img.uploaded_at,
        url=f"/uploads/{img.filename}",
    )


@router.get("", response_model=list[GalleryImageOut])
def list_images(db: Session = Depends(get_db)) -> list[GalleryImageOut]:
    images = db.query(GalleryImage).order_by(GalleryImage.uploaded_at.desc()).all()
    return [_to_out(i) for i in images]


@router.post("", response_model=GalleryImageOut, status_code=status.HTTP_201_CREATED)
async def upload_image(
    file: UploadFile = File(...),
    caption: str | None = Form(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> GalleryImageOut:
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail=f"Unsupported file type {ext}")
    new_name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / new_name
    with dest.open("wb") as f:
        f.write(await file.read())

    img = GalleryImage(filename=new_name, caption=caption)
    db.add(img)
    db.commit()
    db.refresh(img)
    return _to_out(img)


@router.delete("/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> None:
    img = db.query(GalleryImage).get(image_id)
    if not img:
        raise HTTPException(status_code=404, detail="Not found")
    try:
        os.remove(UPLOAD_DIR / img.filename)
    except FileNotFoundError:
        pass
    db.delete(img)
    db.commit()
