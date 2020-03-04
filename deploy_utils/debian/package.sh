#!/bin/bash

set -ex

# USAGE:
#   package.sh <APP> <ARCH>
#
# WHERE:
#   APP
#     is path to Linux application built by nwjs-builder-phoenix
#     (typically dist/something)
#   ARCH
#     is a respective dpkg architecture
#     (like one printed with `dpkg --print-architecture`)

SOURCE=`readlink -f "$1"`
TARGET=`readlink -f "${SOURCE}/../target-$2"`
META_FILES="${SOURCE}/deploy_utils/debian"
VERSION=`node -e "console.log(require('${SOURCE}/package.json').version)"`
ARCH="$2"

mkdir -p "${TARGET}/DEBIAN"
mkdir -p "${TARGET}/usr/share/applications"
mkdir -p "${TARGET}/usr/share/doc/fotorelacjonusz"
mkdir -p "${TARGET}/usr/share/icons"
mkdir -p "${TARGET}/opt/fotorelacjonusz"

cp -T "${META_FILES}/control" "${TARGET}/DEBIAN/control"
cp -T "${META_FILES}/copyright" "${TARGET}/usr/share/doc/fotorelacjonusz/copyright"
cp -T "${META_FILES}/fotorelacjonusz.desktop" "${TARGET}/usr/share/applications/fotorelacjonusz.desktop"
cp -Tr "${SOURCE}/icon/xdg" "${TARGET}/usr/share/icons/hicolor"
cp -Tr "${SOURCE}" "${TARGET}/opt/fotorelacjonusz"

sed "${TARGET}/DEBIAN/control" -i -e "s/^Version:.*$/Version: $VERSION/"
sed "${TARGET}/DEBIAN/control" -i -e "s/^Architecture:.*$/Architecture: $ARCH/"
sed "${TARGET}/usr/share/applications/fotorelacjonusz.desktop" -i -e "s/^Version=.*$/Version=$ARCH/"

find "${TARGET}" -type d | xargs chmod 0755
find "${TARGET}" -type f | xargs chmod 0644
chmod 0755 "${TARGET}/opt/fotorelacjonusz/fotorelacjonusz"

fakeroot dpkg-deb --build "${TARGET}" .

echo "DEB package has been built."
echo "You may now delete \"${TARGET}\" if you want to."
