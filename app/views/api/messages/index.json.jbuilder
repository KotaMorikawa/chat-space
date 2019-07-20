json.array! @messages do |message|
    json.body message.body
    json.time message.created_at.strftime("%Y/%m/%d %H:%M")
    json.image message.image.url
    json.user_name message.user.name
    json.id message.id
end