import { useState } from "react";
import { Modal, Form, Input, Divider, message } from "antd";
import { useEffect } from "react";

/**
 * EditUserModal - Self-contained modal for editing user details
 * Manages its own open/close state and form logic
 * Uses render props pattern to expose openEditModal function
 */
function EditUserModal({ onSave, onUserUpdated, children }) {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // Open modal with a specific user
  const openModal = (userToEdit) => {
    setCurrentUser(userToEdit);
    setOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  // Reset form when user changes or modal opens
  useEffect(() => {
    if (open && currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phone,
        website: currentUser.website,
        street: currentUser.address?.street,
        suite: currentUser.address?.suite,
        city: currentUser.address?.city,
        zipcode: currentUser.address?.zipcode,
        companyName: currentUser.company?.name,
        catchPhrase: currentUser.company?.catchPhrase,
        bs: currentUser.company?.bs,
      });
    }
  }, [open, currentUser, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Reconstruct the user object with nested structure
      const updatedUser = {
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        website: values.website,
        address: {
          ...currentUser.address,
          street: values.street,
          suite: values.suite,
          city: values.city,
          zipcode: values.zipcode,
        },
        company: {
          ...currentUser.company,
          name: values.companyName,
          catchPhrase: values.catchPhrase,
          bs: values.bs,
        },
      };

      onSave(currentUser.id, updatedUser);
      message.success("User updated successfully");

      // Notify parent of the updated user data
      if (onUserUpdated) {
        onUserUpdated(currentUser.id, updatedUser);
      }

      closeModal();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      {/* Render children with openModal function */}
      {children({ openEditModal: openModal })}

      <Modal
        title="Edit User"
        open={open}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText="Save Changes"
        cancelText="Cancel"
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Divider orientation="left">Personal Info</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter the username" }]}
            >
              <Input placeholder="Enter username" addonBefore="@" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item name="phone" label="Phone">
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item name="website" label="Website">
              <Input placeholder="Enter website" />
            </Form.Item>
          </div>

          <Divider orientation="left">Address</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="street" label="Street">
              <Input placeholder="Enter street" />
            </Form.Item>

            <Form.Item name="suite" label="Suite/Apt">
              <Input placeholder="Enter suite or apartment" />
            </Form.Item>

            <Form.Item name="city" label="City">
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item name="zipcode" label="Zipcode">
              <Input placeholder="Enter zipcode" />
            </Form.Item>
          </div>

          <Divider orientation="left">Company</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="companyName" label="Company Name">
              <Input placeholder="Enter company name" />
            </Form.Item>

            <Form.Item name="catchPhrase" label="Catch Phrase">
              <Input placeholder="Enter catch phrase" />
            </Form.Item>

            <Form.Item name="bs" label="Business">
              <Input placeholder="Enter business description" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default EditUserModal;
