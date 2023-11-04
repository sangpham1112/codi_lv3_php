import React from "react";
import Modal from "~/components/Modal";
import Input from "~/components/Input";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { changeAvatar } from "~/api/Users";

const ChangeAvatar = ({ id }) => {
  const [image, setImage] = React.useState("");

  const { mutation: changeAvatarMutation } = useCustomMutate(
    "users",
    changeAvatar
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const submitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("avatar", image);
    changeAvatarMutation.mutate({ id, data: formData });
  };

  return (
    <Modal id="changeAvatar" name="Đổi avatar" onSubmit={submitForm}>
      <img
        src={image.preview}
        alt=""
        className="img-fluid w-25 h-25 mb-3 rounded"
      />

      <Input type="file" title="avatar" name="avatar" onChange={handleImage} />
    </Modal>
  );
};

export default ChangeAvatar;
