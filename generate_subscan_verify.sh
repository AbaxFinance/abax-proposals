#!/bin/bash

root_dir=$(pwd)


cargo_toml_locations=(
    "$root_dir/proposals/03_update_interest_rate_model/update_interest_rate_model/Cargo.toml",
)

for cargo_toml in "${cargo_toml_locations[@]}"
do
    cd $(dirname $cargo_toml)
    python3 "$root_dir/convert.py" --manifest Cargo.toml > subscan_verify.json
    cd $root_dir
done

