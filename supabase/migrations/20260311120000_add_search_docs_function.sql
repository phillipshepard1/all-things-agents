DROP FUNCTION IF EXISTS search_support_docs(text);

CREATE OR REPLACE FUNCTION search_support_docs(search_query text)
RETURNS TABLE (
  id uuid,
  slug text,
  title text,
  description text,
  category_slug text,
  category_title text,
  parent_slug text,
  parent_title text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sd.id,
    sd.slug,
    sd.title,
    sd.description,
    dc.slug AS category_slug,
    dc.title AS category_title,
    dp.slug AS parent_slug,
    dp.title AS parent_title
  FROM support_docs sd
  JOIN doc_categories dc ON sd.category_id = dc.id
  JOIN doc_parents dp ON dc.parent_id = dp.id
  WHERE sd.status = 'published'
    AND sd.slug != 'index'
    AND (
      sd.title ILIKE '%' || search_query || '%'
      OR sd.description ILIKE '%' || search_query || '%'
      OR sd.content::text ILIKE '%' || search_query || '%'
    )
  LIMIT 20;
END;
$$ LANGUAGE plpgsql STABLE;
