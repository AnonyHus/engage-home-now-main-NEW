#!/bin/bash
BACKUP_DIR="/home/appuser/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_FILE="/home/appuser/YOUR_REPO/TestDB.db"

mkdir -p $BACKUP_DIR
cp $DB_FILE $BACKUP_DIR/TestDB_$DATE.db
echo "✅ Backup created: TestDB_$DATE.db"

# Keep only last 30 backups
cd $BACKUP_DIR
ls -t | tail -n +31 | xargs -r rm
