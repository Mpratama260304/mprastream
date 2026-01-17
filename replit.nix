{ pkgs }: {
  deps = [
    pkgs.nodejs_20

    # build tools untuk native deps (sqlite3/bcrypt kadang compile)
    pkgs.python312
    pkgs.gnumake
    pkgs.gcc
    pkgs.pkg-config

    # ffmpeg (sekalian bawa ffprobe di PATH)
    pkgs.ffmpeg

    # optional tapi sering membantu
    pkgs.openssl
    pkgs.sqlite
    pkgs.git
  ];
}
