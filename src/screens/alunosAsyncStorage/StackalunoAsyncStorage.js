import { createStackNavigator } from '@react-navigation/stack'
import FormalunoAsyncStorage from './FormalunoAsyncStorage.js'
import ListaalunosAsyncStorage from './ListaalunoAsyncStorage.js'

const Stack = createStackNavigator()

export default function StackalunosAsyncStorage() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaalunosAsyncStorage'
        >

            <Stack.Screen name='ListaalunosAsyncStorage' component={ListaalunosAsyncStorage} />

            <Stack.Screen name='FormalunoAsyncStorage' component={FormalunoAsyncStorage} />

        </Stack.Navigator>

    )
}
