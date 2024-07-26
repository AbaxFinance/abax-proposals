#!/bin/bash
CARGO_TOML_FOLDER_PATH=$1

if [ -z "$CARGO_TOML_FOLDER_PATH" ]
then
    echo "Please provide the path to the folder containing the Cargo.toml file"
    exit 1
fi

npx @c-forge/typechain-compiler \
    --release \
    --verifiable \
    --files $CARGO_TOML_FOLDER_PATH/Cargo.toml \
    --artifactsPath $CARGO_TOML_FOLDER_PATH/artifacts \
    --typechainGeneratedPath $CARGO_TOML_FOLDER_PATH/typechain