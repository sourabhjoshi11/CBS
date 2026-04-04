from pathlib import Path

from dotenv import load_dotenv


def load_environment() -> None:
    backend_root = Path(__file__).resolve().parents[1]
    env_file = backend_root / ".env"
    load_dotenv(env_file, override=False)


load_environment()
