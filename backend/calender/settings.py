from pathlib import Path
from tempfile import gettempdir
from pydantic_settings import BaseSettings
from yarl import URL

TEMP_DIR = Path(gettempdir())


class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured
    with environment variables.
    """

    base_path: str = str(Path(__file__).parent.absolute())
    hot_reload: bool = False

    # Variables for the database
    db_host: str = "0.0.0.0"
    db_port: int = 5432
    db_user: str = "admin"
    db_pass: str = "admin123"
    db_base: str = "calendar_db"
    db_echo: bool = True

    @property
    def db_url(self) -> URL:
        """
        Assemble database URL from settings.

        :return: database URL.
        """
        return URL.build(
            scheme="postgresql+psycopg2",
            host=self.db_host,
            port=self.db_port,
            user=self.db_user,
            password=self.db_pass,
            path=f"/{self.db_base}",
        )

    @property
    def auto_generate_tables(self):
        return True


settings = Settings()
