from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..deps import get_current_admin, get_db
from ..models import Inquiry, User
from ..schemas import InquiryCreate, InquiryOut, InquiryStatusUpdate

router = APIRouter(prefix="/api/inquiries", tags=["inquiries"])


@router.post("", response_model=InquiryOut, status_code=status.HTTP_201_CREATED)
def create_inquiry(payload: InquiryCreate, db: Session = Depends(get_db)) -> Inquiry:
    inquiry = Inquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("", response_model=list[InquiryOut])
def list_inquiries(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> list[Inquiry]:
    return db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()


@router.patch("/{inquiry_id}", response_model=InquiryOut)
def update_status(
    inquiry_id: int,
    payload: InquiryStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> Inquiry:
    inquiry = db.query(Inquiry).get(inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="Not found")
    inquiry.status = payload.status
    db.commit()
    db.refresh(inquiry)
    return inquiry
