export $(grep -v '^#' .env | xargs) && \
docker build -t asepharyana.my.id:latest \
  --build-arg SECRET=$SECRET \
  --build-arg NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
  --build-arg NEXTAUTH_URL=$NEXTAUTH_URL \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID \
  --build-arg GOOGLE_OAUTH_CLIENT_ID=$GOOGLE_OAUTH_CLIENT_ID \
  --build-arg GOOGLE_OAUTH_CLIENT_SECRET=$GOOGLE_OAUTH_CLIENT_SECRET \
  --build-arg SUPABASE_URL=$SUPABASE_URL \
  --build-arg SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY \
  --build-arg GEMINI_API=$GEMINI_API \
  --build-arg NEXT_PUBLIC_KOMIK=$NEXT_PUBLIC_KOMIK \
  --build-arg NEXT_PUBLIC_ANIME=$NEXT_PUBLIC_ANIME \
  --build-arg NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
  --build-arg DATABASE_URL=$DATABASE_URL \
  .