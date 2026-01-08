import { useState, useEffect } from "react";
import { Modal } from "antd";
import UserCard from "./UserCard";

/**
 * UserCardModal - Self-contained modal for displaying user details on mobile
 * Manages its own open/close state based on selectedUser and isMobile
 */
function UserCardModal({ selectedUser, isMobile, onEdit }) {
  const [open, setOpen] = useState(false);

  // Auto-open modal when a user is selected on mobile
  useEffect(() => {
    if (isMobile && selectedUser) {
      setOpen(true);
    } else if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile, selectedUser]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open && isMobile} onCancel={handleClose} footer={null}>
      <UserCard
        className="p-4 rounded-xl shadow-card-lg"
        selectedUser={selectedUser}
        isModal
        onEdit={(user) => {
          onEdit(user);
          handleClose();
        }}
      />
    </Modal>
  );
}

export default UserCardModal;
