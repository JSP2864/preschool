from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .models import InquiryStatus


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: EmailStr


class NewsBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1)


class NewsCreate(NewsBase):
    pass


class NewsUpdate(NewsBase):
    pass


class NewsOut(NewsBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    published_at: datetime
    author_id: int


class GalleryImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    filename: str
    caption: Optional[str]
    uploaded_at: datetime
    url: str


class InquiryCreate(BaseModel):
    parent_name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=50)
    child_name: str = Field(min_length=1, max_length=200)
    child_age: int = Field(ge=0, le=12)
    message: Optional[str] = None


class InquiryStatusUpdate(BaseModel):
    status: InquiryStatus


class InquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    parent_name: str
    email: EmailStr
    phone: Optional[str]
    child_name: str
    child_age: int
    message: Optional[str]
    status: InquiryStatus
    created_at: datetime
