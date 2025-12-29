import { Modal } from "antd";
import UserCard from "./UserCard";

function UserCardModal({ open, onClose, selectedUser }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <UserCard
        className="p-4 rounded-xl shadow-card-lg"
        selectedUser={selectedUser}
        isModal
      />
    </Modal>
  );
}

export default UserCardModal;
