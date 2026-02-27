#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSET_DIR="$ROOT_DIR/assets/gallery-product"

mkdir -p "$ASSET_DIR"

download_asset() {
  local url="$1"
  local base_name="$2"
  local tmp_file="$ASSET_DIR/${base_name}.tmp"
  local mime=""
  local ext="bin"

  echo "Downloading $base_name..."
  curl -fL "$url" -o "$tmp_file"

  mime="$(file --brief --mime-type "$tmp_file")"
  case "$mime" in
    image/jpeg) ext="jpg" ;;
    image/png) ext="png" ;;
    image/webp) ext="webp" ;;
    image/gif) ext="gif" ;;
    *) ext="bin" ;;
  esac

  mv "$tmp_file" "$ASSET_DIR/${base_name}.${ext}"
}

download_asset "https://www.figma.com/api/mcp/asset/ff72cf2a-cbdb-443c-941d-f5e9acaae4c2" "state-1-main"
download_asset "https://www.figma.com/api/mcp/asset/8609c55d-9e45-4ef1-bafe-8078fe8ba79a" "state-1-thumb"
download_asset "https://www.figma.com/api/mcp/asset/e7214b1e-ee16-4c89-a262-211254debe57" "state-2-main"
download_asset "https://www.figma.com/api/mcp/asset/28e2f40e-1af6-4c61-87ea-94d9c9004ed0" "state-2-thumb"
download_asset "https://www.figma.com/api/mcp/asset/985de67c-2788-4e9c-946f-a65d39499c1a" "state-3-main"
download_asset "https://www.figma.com/api/mcp/asset/37416ae4-b5fb-4e0b-a0e9-e7b97cbf5f1a" "state-3-thumb"
download_asset "https://www.figma.com/api/mcp/asset/2535c907-c63a-410d-99d4-093aa5a8dc84" "state-4-main"
download_asset "https://www.figma.com/api/mcp/asset/4d63fd7b-1f2c-4ae0-a38b-d3b60dfd3e55" "state-4-thumb"
download_asset "https://www.figma.com/api/mcp/asset/05bad7a0-00a1-484e-b1b8-45eb980089bf" "state-5-main"
download_asset "https://www.figma.com/api/mcp/asset/f8c2cfcc-dc69-450e-a7d8-379d2aed8299" "state-5-thumb"

echo "Done. Frozen assets are in: $ASSET_DIR"
