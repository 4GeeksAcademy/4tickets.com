"""merge migration heads

Revision ID: 2b9c1add4198
Revises: 660200f2ca95, 86e5daaba46c
Create Date: 2026-07-14 21:37:30.882817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b9c1add4198'
down_revision = ('660200f2ca95', '86e5daaba46c')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
