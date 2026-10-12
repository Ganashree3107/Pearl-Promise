from fastapi import Depends, HTTPException, status

from app.dependencies.auth import get_current_user


async def require_admin(current_user: dict = Depends(get_current_user)) -> dict:
    if not current_user.get("is_admin", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required",
        )
    return current_user
