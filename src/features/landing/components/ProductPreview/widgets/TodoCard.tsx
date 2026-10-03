import { Check, Pencil, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cx } from '@/lib/cx'
import { todos } from '../mockData'
import { WidgetCard } from './WidgetCard'
import styles from './Widgets.module.css'

export function TodoCard() {
  return (
    <WidgetCard
      title={
        <>
          <Pencil size={13} strokeWidth={2} />
          To-do list
        </>
      }
      action={
        <span className={styles.action}>
          <Plus size={12} strokeWidth={2} />
          Create new
        </span>
      }
    >
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.label} className={styles.todo}>
            <span className={cx(styles.checkbox, todo.done && styles.checked)}>
              {todo.done && <Check size={11} strokeWidth={3} />}
            </span>
            <span className={cx(todo.done && styles.todoDone)}>
              {todo.label}
              {todo.tag && (
                <Badge tone={todo.tag.tone} size="sm" className={styles.todoTag}>
                  {todo.tag.label}
                </Badge>
              )}
            </span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
