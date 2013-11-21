---
title: Metaploitable Port 22/tcp - openssh
updated_at: 2013-11-18 10:45am
---

# Metaploitable Port 22/tcp - openssh

## Grab service version

```bash
msf > nmap -sV 10.13.37.136 -p 22
[*] exec: nmap -sV 10.13.37.136 -p 22
Starting Nmap 6.40 ( http://nmap.org ) at 2013-11-18 10:32 EST
Nmap scan report for 10.13.37.136
Host is up (0.0015s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## Search for an exploit

A quick google search reveals that OpenSSH 4.7p1 is vulnerable to
[CVE-2008-5161](http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2008-5161).

```bash
msf > search ssh
Matching Modules
================

   Name                                            Disclosure Date  Rank       Description
   ----                                            ---------------  ----       -----------
   auxiliary/dos/windows/ssh/sysax_sshd_kexchange  2013-03-17       normal     Sysax Multi-Server 6.10 SSHD Key Exchange Denial of Service
   auxiliary/fuzzers/ssh/ssh_kexinit_corrupt                        normal     SSH Key Exchange Init Corruption
   auxiliary/fuzzers/ssh/ssh_version_15                             normal     SSH 1.5 Version Fuzzer
   auxiliary/fuzzers/ssh/ssh_version_2                              normal     SSH 2.0 Version Fuzzer
   auxiliary/fuzzers/ssh/ssh_version_corrupt                        normal     SSH Version Corruption
   auxiliary/scanner/ssh/ssh_identify_pubkeys                       normal     SSH Public Key Acceptance Scanner
   auxiliary/scanner/ssh/ssh_login                                  normal     SSH Login Check Scanner
   auxiliary/scanner/ssh/ssh_login_pubkey                           normal     SSH Public Key Login Scanner
   auxiliary/scanner/ssh/ssh_version                                normal     SSH Version Scanner
   exploit/apple_ios/ssh/cydia_default_ssh         2007-07-02       excellent  Apple iOS Default SSH Password Vulnerability
   exploit/linux/ssh/f5_bigip_known_privkey        2012-06-11       excellent  F5 BIG-IP SSH Private Key Exposure
   exploit/linux/ssh/symantec_smg_ssh              2012-08-27       excellent  Symantec Messaging Gateway 9.5 Default SSH Password Vulnerability
   exploit/multi/ssh/sshexec                       1999-01-01       manual     SSH User Code Execution
   exploit/unix/ssh/tectia_passwd_changereq        2012-12-01       excellent  Tectia SSH USERAUTH Change Request Password Reset Vulnerability
   exploit/windows/local/trusted_service_path      2001-10-25       excellent  Windows Service Trusted Path Privilege Escalation
   exploit/windows/ssh/freeftpd_key_exchange       2006-05-12       average    FreeFTPd 1.0.10 Key Exchange Algorithm String Buffer Overflow
   exploit/windows/ssh/freesshd_authbypass         2010-08-11       excellent  Freesshd Authentication Bypass
   exploit/windows/ssh/freesshd_key_exchange       2006-05-12       average    FreeSSHd 1.0.9 Key Exchange Algorithm String Buffer Overflow
   exploit/windows/ssh/putty_msg_debug             2002-12-16       normal     PuTTy.exe <= v0.53 Buffer Overflow
   exploit/windows/ssh/securecrt_ssh1              2002-07-23       average    SecureCRT <= 4.0 Beta 2 SSH1 Buffer Overflow
   exploit/windows/ssh/sysax_ssh_username          2012-02-27       normal     Sysax 5.53 SSH Username Buffer Overflow
   post/linux/gather/enum_network                                   normal     Linux Gather Network Information
   post/multi/gather/ssh_creds                                      normal     Multi Gather OpenSSH PKI Credentials Collection
   post/windows/gather/credentials/mremote                          normal     Windows Gather mRemote Saved Password Extraction
```

