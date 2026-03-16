# Notes App — AWS EC2 Deployment Guide (Amazon Linux)

## Prerequisites

- An AWS account with an EC2 instance running **Amazon Linux 2023** (or Amazon Linux 2).
- SSH key pair (`.pem` file) for the instance.
- Security group allowing **inbound TCP on port 3000** (and port 22 for SSH).

---

## 1. Launch & Connect

```bash
# Launch an instance from the AWS console (t2.micro is fine for a demo).
# Then connect:
ssh -i "your-key.pem" ec2-user@<EC2_PUBLIC_IP>
```

---

## 2. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
# Reload your shell profile
source ~/.bashrc
bun --version   # Verify installation
```

---

## 3. Install Node.js (required by Next.js internals)

```bash
# Amazon Linux 2023
sudo dnf install -y nodejs

# Amazon Linux 2  (alternative)
# curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
# sudo yum install -y nodejs
node --version  # Verify (v18+ recommended)
```

---

## 4. Clone the project

```bash
git clone <YOUR_REPO_URL> ~/notes-app
cd ~/notes-app
```

> If you are not using Git, you can `scp` the project folder to the instance instead.

---

## 5. Install dependencies

```bash
bun install
```

---

## 6. Build for production

```bash
bun run build
```

---

## 7. Start the server

```bash
# Start on port 3000 (default)
bun run start
```

The app is now accessible at **http://\<EC2_PUBLIC_IP\>:3000**.

---

## 8. Run as a background service (optional)

To keep the app running after you disconnect SSH, use a process manager:

### Option A — `nohup`

```bash
nohup bun run start > app.log 2>&1 &
```

### Option B — `systemd` service (recommended)

Create a service file:

```bash
sudo tee /etc/systemd/system/notes-app.service > /dev/null <<EOF
[Unit]
Description=Notes App (Next.js)
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/notes-app
ExecStart=/home/ec2-user/.bun/bin/bun run start
Restart=on-failure
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable notes-app
sudo systemctl start notes-app

# Check status
sudo systemctl status notes-app
```

---

## Security Group Reminder

In the AWS Console → EC2 → Security Groups, ensure your instance's inbound rules include:

| Type       | Protocol | Port  | Source    |
| ---------- | -------- | ----- | -------- |
| Custom TCP | TCP      | 3000  | 0.0.0.0/0 |
| SSH        | TCP      | 22    | Your IP  |

---

## Quick Reference

```bash
bun install        # Install dependencies
bun run dev        # Development server (hot reload)
bun run build      # Production build
bun run start      # Start production server on port 3000
```
