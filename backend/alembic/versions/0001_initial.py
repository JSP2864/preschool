"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-04-24

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # users
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    # optional index for faster search
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    # news
    op.create_table(
        "news",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column(
            "published_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "author_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
    )

    # gallery_images
    op.create_table(
        "gallery_images",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("filename", sa.String(length=255), nullable=False),
        sa.Column("caption", sa.String(length=500), nullable=True),
        sa.Column(
            "uploaded_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    # create enum safely (works in docker + local)
    op.execute(
        """
        DO $$
        BEGIN
            CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'closed');
        EXCEPTION
            WHEN duplicate_object THEN NULL;
        END
        $$;
        """
    )

    # inquiries
    op.create_table(
        "inquiries",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("parent_name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("child_name", sa.String(length=200), nullable=False),
        sa.Column("child_age", sa.Integer(), nullable=False),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column(
            "status",
            postgresql.ENUM(
                "new",
                "contacted",
                "closed",
                name="inquiry_status",
                create_type=False,
            ),
            nullable=False,
            server_default=sa.text("'new'"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )


def downgrade() -> None:
    op.drop_table("inquiries")

    postgresql.ENUM(
        name="inquiry_status"
    ).drop(op.get_bind(), checkfirst=True)

    op.drop_table("gallery_images")
    op.drop_table("news")

    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")