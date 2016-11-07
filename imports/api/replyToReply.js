db.system.js.remove({"_id": "replyToReply"})

db.system.js.save({"_id": "replyToReply", "value": function (commentId) {
db.forum.find({_id: ObjectId(commentId)}).forEach(function(current) {
current.text = "beeeer";
db.forum.save(current);
} });
