
import { Avatar, Tooltip } from "antd";


const GroupAvater = ({ happyClientPhoto }) => {
  return (
    <div>
      <Avatar.Group>
        {
          happyClientPhoto?.map((item, index) => {
            return (
              <Avatar key={index} src={item?.user?.photo} size={50} />
            )
          })
        }


        <Avatar
          src="/bannerAvater/avater5.svg"
          style={{ backgroundColor: "white", padding: "10px" }}
          size={50}
        />
      </Avatar.Group>
    </div>
  );
};

export default GroupAvater;
