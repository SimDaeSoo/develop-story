#!/bin/bash

if [ -n "$CIRCLE_TAG" ]; then
    TAG_NAME="release-${CIRCLE_TAG}"
else
    TAG_NAME="build-$(git rev-parse --short HEAD)"

IMAGE_NAME="${DOCKER_IDENTIFIER}/${DOCKER_IMAGE_NAME}"

docker login -u ${DOCKER_IDENTIFIER} -p ${DOCKER_PASSWORD}
docker build -t ${IMAGE_NAME}:${TAG_NAME} .
docker tag ${IMAGE_NAME}:${TAG_NAME} ${IMAGE_NAME}:latest
docker push ${IMAGE_NAME}:latest
docker push ${IMAGE_NAME}:${TAG_NAME}
