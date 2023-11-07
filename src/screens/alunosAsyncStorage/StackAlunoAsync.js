import { createStackNavigator } from '@react-navigation/stack'
import FormAlunoAsync from './FormAlunoAsync.js'
import ListaAlunosAsync from './ListaAlunoAsync.js'

const Stack = createStackNavigator()

export default function StackAlunosAsync() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAlunosAsync'
        >

            <Stack.Screen name='ListaAlunosAsync' component={ListaAlunosAsync} />

            <Stack.Screen name='FormAlunoAsync' component={FormAlunoAsync} />

        </Stack.Navigator>

    )
}
