run: packages
	@echo "Launching..."
	@npm run serve

deploy: packages
	@echo "Launching..."
	@npm run deploy

build: packages
	@echo "Building..."
	@npm run build

packages:
	@echo "Installing dependencies..."
	@npm install

clean:
	@echo "Removing dependencies and built assets..."
	@rm -rf node_modules build
	@echo "Done.\n"

.PHONY: clean
