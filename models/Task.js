const taskSchema = new Schema({
    title: String,
    des: String,
    deadline: Date,
    member: String,
}, {
    Collection: "task"
});

