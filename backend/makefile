# ==============================================================================
# Simple Makefile: install and run only
# ==============================================================================

VENV_DIR ?= .venv
PYTHON := $(VENV_DIR)/bin/python
PIP := $(VENV_DIR)/bin/pip

# ==============================================================================
# Install dependencies
# ==============================================================================
install: ## Install core dependencies
	@echo "Installing core dependencies..."
	$(PIP) install -r requirements.txt

# ==============================================================================
# Run server
# ==============================================================================
run:
	PYTHONPATH=".." .venv/bin/python -m calender.app


