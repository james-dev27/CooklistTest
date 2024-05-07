import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GenericOrder} from '../types/types';

interface OrderListProps {
  cookies: object;
}

const OrderList: React.FC<OrderListProps> = ({cookies}) => {
  const [orders, setOrders] = useState<GenericOrder<any>[]>([]);

  useEffect(() => {
    // need to fetch orders using cookie
    setOrders([]);
  }, [cookies]);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text>Order ID: {item.id}</Text>
          <Text>Details: {item.details}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OrderList;
