import React, {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import Clipboard from "../assets/Clipboard.svg";

import Task from "./Task";

import styles from "./Container.module.css";
import { PlusCircle } from "phosphor-react";

interface TaskProps {
  id: string;
  content: string;
  isComplete: boolean;
}

export default function Container() {
  const [newTaskText, setNewTaskText] = useState("");

  const [countCompletedTasks, setCountCompletedTasks] = useState(0);

  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  useEffect(() => {
    const countTasks = tasks.reduce((count, task) => {
      if (task.isComplete === false) return count;
      return count + 1;
    }, 0);
    setCountCompletedTasks(countTasks);
  });

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      content: newTaskText,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(
    event: InvalidEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(tasksWithoutDeletedOne);
  }

  function completeTask(id: string) {
    console.log(id, tasks);
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, isComplete: !task.isComplete }
          : task
      )
    );
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <div>
      <div>
        <form
          onSubmit={handleCreateNewTask}
          className={styles.tasksForm}
        >
          <div className={styles.addTasks}>
            <textarea
              name="task"
              placeholder="Adicione uma nova tarefa"
              value={newTaskText}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
            />

            <button type="submit" disabled={isNewTaskEmpty}>
              Criar <PlusCircle height={16} width={16} />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.taskAlign}>
        <div className={styles.tasks}>
          <div className={styles.createdAndCompletedTasks}>
            <p className={styles.pBlue}>
              Tarefas Criadas <span>{tasks.length}</span>
            </p>
            <p className={styles.pPurple}>
              Concluídas{" "}
              <span>
                {countCompletedTasks}

                {countCompletedTasks > 0 && " de " + tasks.length}
              </span>
            </p>
          </div>

          {tasks.length > 0 ? (
            <div className={styles.tasksToDo}>
              {tasks.map((task: TaskProps) => {
                return (
                  <div>
                    <Task
                      id={task.id}
                      content={task.content}
                      isComplete={task.isComplete}
                      onDelete={deleteTask}
                      onComplete={completeTask}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.noTasks}>
              <img src={Clipboard} alt="" />
              <div>
                <span>Você ainda não tem tarefas cadastradas</span>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
