from sqlalchemy.orm import Session

from .auth import hash_password
from .config import get_settings
from .database import SessionLocal
from .models import User


def seed_admin(db: Session) -> None:
    settings = get_settings()
    existing = db.query(User).filter(User.email == settings.admin_email).first()
    if existing:
        print(f"[seed] admin {settings.admin_email} already exists")
        return
    user = User(email=settings.admin_email, password_hash=hash_password(settings.admin_password))
    db.add(user)
    db.commit()
    print(f"[seed] created admin {settings.admin_email}")


def main() -> None:
    db = SessionLocal()
    try:
        seed_admin(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
