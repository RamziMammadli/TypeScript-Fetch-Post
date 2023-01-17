import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [categories, setcategories] = useState<Suppliers[]>([]);

  interface Suppliers {
    id?: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: {
      street: string;
      city?: string;
      region?: string;
      postalCode?: number;
      country?: string;
      phone?: number;
    };
  }

  useEffect(() => {
    fetch('https://northwind.vercel.app/api/suppliers', {method: 'POST'})
      .then(res => res.json())
      .then((data: Suppliers[]) => {
        setcategories(data);
      });
  }, []);

  function PostSupplier(
    companyname: string,
    contactname: string,
    contacttitle: string,
    street: string,
  ) {
    let url = `https://northwind.vercel.app/api/suppliers`;
    let news: Suppliers = {
      companyName: companyname,
      contactName: contactname,
      contactTitle: contacttitle,
      address:{
        street:street
      },
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  const Box = ({item}: {item: Suppliers}) => {
    return (
      <View>
        <Text>{item.companyName}</Text>
        <Text>{item.contactName}</Text>
        <Text>{item.contactTitle}</Text>
        <Text>{item.address.street}</Text>
      </View>
    );
  };

  const [companyname, setcompanyname] = useState<string>('');
  const [contactname, setcontactname] = useState<string>('');
  const [contacttitle, setcontacttitle] = useState<string>('');
  const [street, setstreet] = useState<string>('');

  return (
    <View>
      <View>
        <TextInput value={companyname} onChangeText={setcompanyname} />
      </View>
      <View>
        <TextInput value={contactname} onChangeText={setcontactname} />
      </View>
      <View>
        <TextInput value={contacttitle} onChangeText={setcontacttitle} />
      </View>
      <View>
        <TextInput value={street} onChangeText={setstreet} />
      </View>
      <Button
        title="Add"
        onPress={() =>
          PostSupplier(companyname, contactname, contacttitle, street)
        }
      />
      {/* <FlatList
        scrollEnabled={true}
        data={categories}
        renderItem={({item}) => <Box item={item} />}
      /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';

// const App = () => {
//   const [categories, setcategories] = useState<Category[]>([]);

//   interface Category {
//     id: number;
//     supplierId: number;
//     categoryId: number;
//     quantityPerUnit: string;
//     unitPrice: number;
//     unitsInStock: number;
//     unitsOnOrder: number;
//     reorderLevel: 0;
//     discontinued: boolean;
//     name: string;
//     supplier: {
//       id: 2;
//       companyName: string;
//       contactName: string;
//       contactTitle: string;
//       address: {
//         street: string;
//         city: string;
//         region: string;
//         postalCode: number;
//         country: string;
//         phone: string;
//       };
//     };
//     category: {
//       id: 3;
//       description: string;
//       name: string;
//     };
//   }

//   useEffect(() => {
//     fetch('https://northwind.vercel.app/api/products')
//       .then(res => res.json())
//       .then((data: Category[]) => {
//         setcategories(data);
//       });
//   }, []);

//   const Box = ({item}: {item: Category}) => {
//     return (
//       <View>
//         <Text>{item.name}</Text>
//       </View>
//     );
//   };

//   return (
//     <View>
//       <FlatList
//         scrollEnabled={true}
//         data={categories}
//         renderItem={({item}) => <Box item={item} />}
//       />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});
