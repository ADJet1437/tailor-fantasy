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

    # Contact form. Messages are always stored; they are additionally emailed
    # only when smtp_host is set.
    contact_recipient: str = "support@talosy.com"
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = ""
    smtp_starttls: bool = True

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
