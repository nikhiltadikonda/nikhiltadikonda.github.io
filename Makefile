# ==============================================================================
# CONFIGURATION & VARIABLES
# ==============================================================================
NODE_MODS  := node_modules
LOCK_FILE  := package-lock.json
BUILD_DIR  := dist

# Default target when running just 'make'
.DEFAULT_GOAL := help

# ==============================================================================
# DEVELOPMENT COMMANDS
# ==============================================================================

.PHONY: install
install: ## Install application dependencies cleanly with legacy peer overrides
	@echo "📦 Installing project packages..."
	npm install

.PHONY: start
start: ## Spin up the local Vite development server
	@echo "⚡ Starting Vite local environment..."
	npm run start

.PHONY: build
build: ## Compile production static bundles to directory assets
	@echo "🏗️  Generating production build matrix..."
	npm run build

.PHONY: preview
preview: ## Run a local server to preview the built production folder
	@echo "👀 Launching local server preview..."
	npm run preview

# ==============================================================================
# UTILITIES & MAINTENANCE
# ==============================================================================

.PHONY: clean
clean: ## Strip away node execution trees and local build outputs
	@echo "🧹 Cleaning workspaces..."
	rm -rf $(NODE_MODS) $(BUILD_DIR)
	@echo "✨ Local workspace sanitized."

.PHONY: reset
reset: clean ## Hard-wipe modules and lockfiles, then rebuild dependency graphs
	@echo "🔄 Purging lock files and resetting state..."
	rm -f $(LOCK_FILE)
	npm cache clean --force
	@echo "🚀 Constructing clean installation pipeline..."
	npm install

.PHONY: help
help: ## Display a map of all available shorthand execution routines
	@echo "📜 Available Automation Macros:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
