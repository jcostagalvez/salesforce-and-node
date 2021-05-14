SELECT json_build_object(
    'Id', t.Id,
    'Name', t.Name,
    'Description', t.Description,
    'Room', t.Room,
    'DateTime', t.DateTime,
    'speakers', json_agg(json_build_object(
        'Id', s.Id,
        'Name', s.Name,
        'Bio', s.Bio,
        'Email', s.Email,
        'PictureURL', s.PictureURL
    ))
)   AS session
FROM sessions t 
INNER JOIN sesions_speaker ts ON ts.Session_Id = t.Id
INNER JOIN speakers s ON ts.Speaker_Id = s.Id
GROUP BY t.Id