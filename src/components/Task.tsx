import React from "react";
import styles from "./Task.module.css";
import { IconContext } from "react-icons";
import { CgRadioCheck } from "react-icons/cg";
import { TbCircleCheckFilled } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";

interface TaskProps {
  id: string;
  content: any;
  isComplete: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export default function Task({
  content,
  id,
  onDelete,
  onComplete,
  isComplete,
}: TaskProps) {
  function handleDelete() {
    onDelete(id);
  }

  function handleComplete() {
    onComplete(id);
  }
  function onClick() {}

  return (
    <div
      key={id}
      className={isComplete ? styles.taskCompleted : styles.task}
    >
      {isComplete ? (
        <div onClick={handleComplete} className={styles.checked}>
          <button>
            <TbCircleCheckFilled size={24} />
            
          </button>
        </div>
      ) : (
        <div onClick={handleComplete} className={styles.check}>
          <button>
            <CgRadioCheck size={24} />
          </button>
        </div>
      )}

      <div className={styles.content}>
        {isComplete === true ? (
          <p className={styles.taskComplete}>{content}</p>
        ) : (
          <p>{content}</p>
        )}
      </div>

      <div className={styles.button}>
        <button onClick={handleDelete} title="Deletar task">
          <TbTrash size={20} />
        </button>
      </div>
    </div>
  );
}
