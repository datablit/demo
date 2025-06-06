run:
	clear
	sudo npm run dev

docker-build:
	docker build --platform linux/amd64 -t d1414k/next-js-demo:latest .

docker-run:
	docker run -p 3000:3000 d1414k/next-js-demo:latest

docker-push:
	docker push d1414k/next-js-demo:latest 

dpush: docker-build docker-push
	@echo "✅ Docker build and push completed successfully!"
