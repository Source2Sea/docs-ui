VERSION := latest
.PHONY: ui-preview ui-bundle


# Simple UI preview using a Node container (expects ./custom-ui to contain antora-ui-default sources)
ui-preview:
	podman run --rm -it -p 5252:5252 -v ${PWD}/antora-ui-default-master:/work -w /work docker.io/library/node:20 bash -lc "npm ci && npx gulp preview"



ui-bundle:
	podman run --rm -v ${PWD}/antora-ui-default-master:/work -w /work node:20 bash -lc "npm ci && npx gulp bundle"
