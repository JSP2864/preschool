from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..deps import get_current_admin, get_db
from ..models import News, User
from ..schemas import NewsCreate, NewsOut, NewsUpdate

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("", response_model=list[NewsOut])
def list_news(db: Session = Depends(get_db)) -> list[News]:
    return db.query(News).order_by(News.published_at.desc()).all()


@router.post("", response_model=NewsOut, status_code=status.HTTP_201_CREATED)
def create_news(
    payload: NewsCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
) -> News:
    post = News(title=payload.title, body=payload.body, author_id=admin.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{news_id}", response_model=NewsOut)
def update_news(
    news_id: int,
    payload: NewsUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> News:
    post = db.query(News).get(news_id)
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    post.title = payload.title
    post.body = payload.body
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
) -> None:
    post = db.query(News).get(news_id)
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(post)
    db.commit()
