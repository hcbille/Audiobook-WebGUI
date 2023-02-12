# syntax=docker/dockerfile:1

FROM node:bullseye-slim

EXPOSE 3000

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN set -x && \
    KEPT_PACKAGES=() && \
    # Packages kept in the image
    KEPT_PACKAGES+=(python3) && \
    KEPT_PACKAGES+=(git) && \
    KEPT_PACKAGES+=(python-is-python3) && \
    KEPT_PACKAGES+=(python3-pip) && \
    KEPT_PACKAGES+=(ca-certificates) && \
    KEPT_PACKAGES+=(ffmpeg) && \
    # Install packages
    apt-get update -y && \
    apt-get install -y --no-install-recommends \
        ${KEPT_PACKAGES[@]}\
        && \
    # Install audiobook-dl via pip
    python3 -m pip install --no-cache-dir --force-reinstall audiobook-dl && \
    # Create /config directory
    mkdir -p /config && \
    # Clean-up
    apt-get remove -y ${TEMP_PACKAGES[@]} && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* /src

WORKDIR /app
RUN git clone https://github.com/hcbille/Audiobook-WebGUI.git .
RUN npm install --production
ENTRYPOINT ["./startup.sh"]