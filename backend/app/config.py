from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=REPO_ROOT / "backend" / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Host default targets the published port from docker-compose.yml (5433).
    database_url: str = "postgresql+psycopg://nailart:nailart@localhost:5433/nailart"
    media_dir: Path = REPO_ROOT / "backend" / "media"
    asset_dir: Path = REPO_ROOT / "asset"
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
