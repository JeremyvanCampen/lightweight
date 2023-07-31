import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text  className='text-red-500'>Tab One</Text>
      <View />
      <EditScreenInfo path="app/(authentication)/index.tsx" />
    </View>
  );
}


