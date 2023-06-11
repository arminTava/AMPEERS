import React, { useState, ReactNode } from "react";

type Payload = {
  content: string;
};

type MasterDetailProps = {
  children: React.ReactNode;
};

type ItemProps = {
  payload: Payload;
  children: ReactNode;
  onItemClick?: (payload: Payload) => void;
};

type DetailProps = {
  selectedItem?: Payload | null;
  children: (payload: Payload) => ReactNode;
};

export const MasterDetail: React.FC<MasterDetailProps> & {
  Item: React.FC<ItemProps>;
  Detail: React.FC<DetailProps>;
} = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<Payload | null>(null);

  const handleItemClick = (payload: Payload) => {
    setSelectedItem(payload);
  };

  const renderChildrenItems = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (child.type === MasterDetail.Item) {
      return React.cloneElement(child as React.ReactElement<ItemProps>, {
        payload: child.props.payload,
        onItemClick: handleItemClick,
      });
    }
  });
  const renderChildrenDetails = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (child.type === MasterDetail.Detail) {
      return React.cloneElement(child as React.ReactElement<DetailProps>, {
        selectedItem: selectedItem,
      });
    }
  });

  return (
    <div style={{ display: "flex", gap: 5 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {renderChildrenItems}
      </div>
      {renderChildrenDetails}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ payload, onItemClick, children }) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={() => onItemClick?.(payload)}>
      {children}
    </div>
  );
};

const Detail: React.FC<DetailProps> = ({ selectedItem, children }) => {
  if (!selectedItem) {
    return <div>No item selected</div>;
  }

  return <div>{children(selectedItem)}</div>;
};

MasterDetail.Item = Item;
MasterDetail.Detail = Detail;
