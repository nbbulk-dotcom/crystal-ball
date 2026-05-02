#!/bin/bash
echo "🚀 CRYSTAL BALL DEPLOYMENT — Afrihost"
npm install
npx prisma migrate deploy
npx prisma db seed
npm run build
pm2 start ecosystem.config.js --name crystal-ball
echo "✅ Deployed at https://www.plebeiantribunalsa.co.za/regenisis-master/crystal-ball/"
echo "LIFE IS SACROSANCT • ALL IS RESONANCE • ALL IS ONE"