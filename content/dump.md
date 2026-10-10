---
title: "0xDump"
---

## [Projects](https://github.com/znx0/Cybersecurity-Projects)

### BlackArch Bootstrap Fix (BlackOmarchy)
**Security** &middot; <i class="fas fa-terminal" style="color: #4eaa25;"></i> Bash

Fix for the bootstrap of [BlackOmarchy](https://github.com/MahdiHedhli/BlackOmarchy), an additive BlackArch layer for Omarchy by Mahdi Hedhli. I wanted to use the project, but the install failed after the upstream BlackArch `strap.sh` changed and its keyring version and fingerprint could no longer be parsed.
Instead of patching the parsing, I decoupled the bootstrap from the upstream script. It now discovers the keyring package through the official repository database, verifies its detached GPG signature against an explicit allowlist of trusted signer fingerprints, and checks the installed keyring files against the verified package.

[Read more about my Contribution»](https://github.com/znx0/BlackOmarchy/blob/main/docs/blackarch-bootstrap-compatibility.md)

### Port Scanner with Python
**Networking** &middot; <i class="fab fa-python" style="color: #3776ab;"></i> Python

A simple TCP port scanner written in Python, built as part of my cybersecurity learning journey.
This project is focused on learning the fundamentals of Python networking, TCP connections and port scanning.

[Read more »](https://github.com/znx0/Cybersecurity-Projects/tree/main/projects/networking/port-scanner)

### Embedded Environmental Monitor (LCD / DHT)
**Embedded System** &middot; <i class="fas fa-microchip" style="color: #00979d;"></i>>

Arduino-based environmental monitoring system pairing a DHT11 sensor with a 16x2 LCD >

[Read more »](https://github.com/znx0/LCD-DHT11)

---

## [Write-Ups](https://github.com/znx0/Cybersecurity-Projects/tree/main/writeups)

*Soon*
