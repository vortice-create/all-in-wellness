ALTER POLICY "Anyone can submit contact form"
ON public.contact_submissions
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND email = btrim(email)
  AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (interest IS NULL OR char_length(interest) <= 60)
  AND char_length(btrim(message)) BETWEEN 1 AND 2000
);
COMMENT ON POLICY "Anyone can submit contact form" ON public.contact_submissions IS
'Public contact form is intentionally insert-only; enforce nonblank required fields, email format, and field length limits at the database boundary.';