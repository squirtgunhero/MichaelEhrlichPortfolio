#!/bin/bash
cd "/Users/michaelehrlich/Downloads/MichaelEhrlichPortfolio"
git add vite.config.ts
git commit -m "Fix: Change Vite output directory from build to dist"
git push origin main
echo "Changes pushed successfully!"

