<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

axios.defaults.baseURL = "http://localhost:3000";

interface Task {
  _id: string;
  category: string;
  task: string;
}

export default defineComponent({
  data() {
    return {
      iau: [] as Task[],
      ianu: [] as Task[],
      niau: [] as Task[],
      nianu: [] as Task[],
      category: "iau" as string,
      task: "" as string,
    };
  },

  mounted() {
    this.Loadiau();
    this.Loadianu();
    this.Loadniau();
    this.Loadnianu();
  },

  methods: {
    async Loadiau() {
      const response = await axios.get("/taskiau");
      this.iau = response.data;
    },
    async Loadianu() {
      const response = await axios.get("/taskianu");
      this.ianu = response.data;
    },
    async Loadniau() {
      const response = await axios.get("/taskniau");
      this.niau = response.data;
    },
    async Loadnianu() {
      const response = await axios.get("/tasknianu");
      this.nianu = response.data;
    },

    async addTask() {
      const newTask: Omit<Task, "_id"> = {
        category: this.category,
        task: this.task,
      };
      await axios.post("/create", newTask);
      this.task = "";
      this.LoadCategoryTasks(this.category);
    },

    LoadCategoryTasks(category: string) {
      if (category === "iau") this.Loadiau();
      else if (category === "ianu") this.Loadianu();
      else if (category === "niau") this.Loadniau();
      else if (category === "nianu") this.Loadnianu();
    },

    async deleteTask(id: string, category: string) {
      try {
        await axios.delete(`/task/${id}`);
        this.LoadCategoryTasks(category);
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
      }
    },
  },
});
</script>

<template>
  <div class="container">
    <h1>Матрица Эйзенхауэра</h1>
    <div class="input-section">
      <input
        type="text"
        id="taskInput"
        placeholder="Введите новую задачу"
        v-model="task"
      />
      <select id="categorySelect" v-model="category">
        <option value="iau">Важно и Срочно</option>
        <option value="ianu">Важно и Несрочно</option>
        <option value="niau">Неважно и Срочно</option>
        <option value="nianu">Неважно и Несрочно</option>
      </select>
      <button id="addTaskButton" @click="addTask">Добавить задачу</button>
    </div>

    <div class="matrix">
      <div class="section" id="iau">
        <h3>Важно и Срочно</h3>
        <ul class="task-list" id="taskListIau">
          <li v-if="iau.length === 0">Начните заполнять матрицу</li>
          <li v-for="task in iau" :key="task._id">
            {{ task.task }}
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteTask(task._id, 'iau')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4.059L8.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="section" id="ianu">
        <h3>Важно и Несрочно</h3>
        <ul class="task-list" id="taskListIanU">
          <li v-if="ianu.length === 0">Начните заполнять матрицу</li>
          <li v-for="task in ianu" :key="task._id">
            {{ task.task }}
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteTask(task._id, 'ianu')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4.059L8.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="section" id="niau">
        <h3>Неважно и Срочно</h3>
        <ul class="task-list" id="taskListNiaU">
          <li v-if="niau.length === 0">Начните заполнять матрицу</li>
          <li v-for="task in niau" :key="task._id">
            {{ task.task }}
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteTask(task._id, 'niau')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4.059L8.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="section" id="nianu">
        <h3>Неважно и Несрочно</h3>
        <ul class="task-list" id="taskListNianU">
          <li v-if="nianu.length === 0">Начните заполнять матрицу</li>
          <li v-for="task in nianu" :key="task._id">
            {{ task.task }}
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteTask(task._id, 'nianu')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4.059L8.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 20px;
}

#iau {
  background-color: #ff2121;
}
#ianu {
  background-color: #ff4500;
}
#niau {
  background-color: #ffd800;
}
#nianu {
  background-color: #32cd32;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 5px;
}

.input-section input {
  flex: 1;
  margin-right: 10px;
  height: 25px;
  border-radius: 5px;
}

.input-section select {
  margin-right: 10px;
}

#addTaskButton {
  background-color: #ffffff;
  border-radius: 5px;
}

.matrix {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.section {
  padding: 15px;
  border-radius: 10px;
}

.section h3 {
  margin-top: 0;
  color: #333;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-list li:hover {
  background-color: #e9e9e9;
}

.task-list li.done {
  opacity: 0.5;
  text-decoration: line-through;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
  background-color: #ffffff;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #fff;
}
</style>