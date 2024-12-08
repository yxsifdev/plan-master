export interface NotesProps {
  id: string;
  title: string;
  content?: string;
  url?: string;
  status: "ACTIVE" | "PROGRESS" | "COMPLETED";
  priority: number;
  createdAt: Date;
  deadline: Date;
  updatedAt: Date;
  isShared: boolean;
  tags: TagProps[];
}

interface TagProps {
  id: string;
  name: string;
  color: string;
}
