FROM archlinux

RUN \
  echo 'Server = https://jpn.mirror.pkgbuild.com/$repo/os/$arch' > /etc/pacman.d/mirrorlist && \
  pacman -Sy --noconfirm base-devel --needed && \
  pacman -Scc --noconfirm && \
  groupadd makepkg && \
  useradd -g makepkg -G wheel -m makepkg && \
  echo '%wheel ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

USER makepkg
