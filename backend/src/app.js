import exppress from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
const app = exppress();
import Task from './modles/task.js';


const DB_URL = 'mongodb+srv://abhishekkaushal2526:gkpgPZee6r5g6I3s@cluster0.crzmewz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
}
connectDb();

app.use(exppress.json());
app.use(exppress.urlencoded({ extended: true }));
app.use(cors());


app.get("/", async (req, res) => {
    console.log("got the get request");
    try {
        const data = await Task.find({});
        return res.status(200).send(data);
    } catch (error) {
        console.log("some error", error);
        res.status(500).send({ messange: "some error", error });
    }
});

app.post("/", async (req, res) => {
    console.log("got the post requesrt");
    const { task } = req.body;
    console.log(task);
    if (!task) {
        return res.status(500).send({ messange: "All fields are required" });
    }
    try {
        const data = new Task({
            task: task,
        });
        await data.save();
        res.send({ message: "data added Successfully" });
    } catch (error) {
        console.log("some error occ", error);
        res.send({ message: "some error occ", error });
    }

})

app.delete("/", async (req, res) => {
    let { id } = req.query;
    console.log("got the delete request");
    if (!id) {
        return res.status(500).send({ messange: "ID are required" });
    }
    try {
        await Task.findByIdAndDelete(id);
        return res.status(200).send({ message: "Successfully Deleted" });
    } catch (error) {
        console.log("some error occ", error);
        return res.status(500).send({ message: "some error occ", error });
    }
});

app.patch("/", async (req, res) => {
    console.log("got the put requst");
    const { id } = req.query;
    const { status } = req.body;
    if (!id) {
        return res.status(500).send({ messange: "ID are required" });
    }
    if (!status) {
        return res.status(500).send({ messange: "Status is required" });
    }
    try {
        let data = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!data) {
            return res.status(404).send({ message: "Task not found" });
        }
        console.log(data);
        return res.status(200).send({ message: "Status updated Successfully" });
    } catch (error) {
        console.log("some error occ", error);
        return res.status(500).send({ message: "some error occ", error });
    }
})

app.listen(3000, () => {
    console.log("listing on port 3000");
})